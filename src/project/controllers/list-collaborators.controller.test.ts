import {Request, Response} from "express";
import {ProjectRepository} from "../repositories/project.repository";
import {listCollaboratorsController} from "./list-collaborators.controller";
import { Project } from "../models/project";

describe('Controller::listCollaborators', () => {
    beforeEach(() => {
        ProjectRepository.projects = [];
        const project1 = new Project('Project 1');
        project1.addCollaborator!("test@test.com");
        ProjectRepository.save(project1);
    });

    it('should return a list of project collaborators', () => {
        let result;
        const req = {params: {projectId: 0}} as any as Request;
        const res = {status: jest.fn().mockReturnThis(),send: (_) => result = _} as any as Response;
        listCollaboratorsController(req, res);
        const collaborators = result.collaborators;
        expect(collaborators.length).toBe(1);
        expect(collaborators[0]).toBe('test@test.com');
   });
});
