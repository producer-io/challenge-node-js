import {Request, Response} from "express";
import {createCollaboratorController} from "./create-collaborator.controller";
import { ProjectRepository } from "../repositories/project.repository";
import { Project } from "../models/project";

describe('Controller::createCollaborator', () => {
    beforeEach(() => {
        ProjectRepository.projects = [];
        const project1 = new Project('Project 1');
        ProjectRepository.save(project1);
    });
    it('should return a 400 error when project id is not found', () => {
        const name = 'Project 1';
        const req = {body: {projectId: -12}} as any as Request
        const res = {status: jest.fn().mockReturnThis(),send: jest.fn()} as any as Response;
        createCollaboratorController(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should return the project with the added collaborator', () => {
        const email = "test@test.com";
        const req = {body: {projectId: 0,email }} as any as Request
        const res = {status: jest.fn().mockReturnThis(),send: jest.fn()} as any as Response;
        createCollaboratorController(req, res);
        const project = ProjectRepository.findById(0);
        const collaborators = project.listCollaborators!();
        expect(collaborators![0]).toBe(email);

    });
});
