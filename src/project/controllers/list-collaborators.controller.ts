import {Request, Response} from "express";
import {ProjectRepository} from "../repositories/project.repository";

export const listCollaboratorsController = async (req: Request, res: Response) => {
    const { projectId } = req.params;
    const project = ProjectRepository.findById(Number(projectId));
    res.status(200).send({
        collaborators: project.listCollaborators()
    });
}