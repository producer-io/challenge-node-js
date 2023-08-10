import {Request, Response} from "express";
import {listProjectCollaboratorsController} from "./list-projects-collaborators.controller";
import {ProjectRepository} from "../repositories/project.repository";
import {Project} from "../models/project";
import {Collaborator} from "../models/project";

describe('Controller::listProjectCollaborators', () => {
    const email = 'test@mail.com';
    beforeEach(() => {
        ProjectRepository.projects = [];
        const project1 = new Project('Project 1');
        project1.addCollaborator({email});
        ProjectRepository.save(project1);
    });

    it('should return a list collaborators of project', () => {
        // Arrange
        let collaborators: Collaborator[] = [];
        const req = {params: {projectId: 0}} as any as Request
        const res = {send: (_) => collaborators = _} as any as Response;

        // Act
        listProjectCollaboratorsController(req, res);

        // Assert
        expect(collaborators.length).toBe(1);
        expect(collaborators[0].email).toBe(email);
   });

   it('should return error if project id not exist', () => {
        // Arrange
        const req = {params: {}} as any as Request
        const res = {status: jest.fn().mockReturnThis(),send: jest.fn()} as any as Response;

        // Act
        listProjectCollaboratorsController(req, res);

        // Assert
        expect(res.status).toHaveBeenCalledWith(400);
    });
});
