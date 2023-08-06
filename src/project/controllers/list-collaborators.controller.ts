import {Request, Response} from "express";
import {ProjectRepository} from "../repositories/project.repository";

export const listCollaboratorsController = async (req: Request, res: Response) => {
    try {
        const { projectId } = req.params;
        const project = ProjectRepository.findById(Number(projectId));
        if(!project){
            throw new Error('Project not found');
        }
        res.status(200).send({
            collaborators: project.listCollaborators!()
        });
    } catch (error :any) {
        res.status(400).send({
            error: error.message
        });
    }
}