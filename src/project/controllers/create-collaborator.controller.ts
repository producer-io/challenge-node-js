import {Request, Response} from "express";
import {ProjectRepository} from "../repositories/project.repository";

export const createCollaboratorController = async (req: Request, res: Response) => {
    try {
        const { projectId, email } = req.body;
        const project = ProjectRepository.findById(projectId);
        project.addCollaborator(email);
        res.send(project);
    } catch (error :any) {
        res.status(400).send({
            error: error.message
        });
    }
}
