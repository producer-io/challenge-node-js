import {Request, Response} from "express";
import {createProjectCollaboratorController} from "./create-project-collaborator.controller";
import {ProjectRepository} from "../repositories/project.repository"
import {Project} from "../models/project"

describe('Controller::createProjectCollaborator', () => {
    it('should be return the new collaborator in project', () => {
        // Arrange
        const name = 'Project 1';
        const email = 'test1@mail.com';
        const req = {body: {email, projectId: 0}} as any as Request
        const res = {status: jest.fn().mockReturnThis(),send: jest.fn()} as any as Response;

        const newProject = new Project(name);
        ProjectRepository.save(newProject);

        // Act
        createProjectCollaboratorController(req, res);

        // Assert
        const project = ProjectRepository.findById(0)
        const createdCollaborator = project.findCollaborator(email)
        expect(createdCollaborator).toStrictEqual({email})
    });

    it('should be return error if project id not exist', () => {
        // Arrange
        const email = 'test@mail.com';
        const req = {body: {email, projectId: 1}} as any as Request
        // const res = {send: jest.fn()} as any as Response;

        const res = {status: jest.fn().mockReturnThis(),send: jest.fn()} as any as Response;

        // Act
        createProjectCollaboratorController(req, res);

        // Assert
        expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should be return error if collaborator email not exist', () => {
        // Arrange
        const req = {body: {projectId: 0}} as any as Request
        const res = {status: jest.fn().mockReturnThis(),send: jest.fn()} as any as Response;

        // Act
        createProjectCollaboratorController(req, res);

        // Assert
        expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should be return error if collaborator email not valid', () => {
        // Arrange
        const email = 'invalid-email';
        const req = {body: {email, projectId: 0}} as any as Request
        const res = {status: jest.fn().mockReturnThis(),send: jest.fn()} as any as Response;

        // Act
        createProjectCollaboratorController(req, res);

        // Assert
        expect(res.status).toHaveBeenCalledWith(400);
    });
});
