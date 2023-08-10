import {Request, Response} from "express";
import {ProjectRepository} from "../repositories/project.repository";

export const listProjectCollaboratorsController = async (req: Request, res: Response) => {
    const {projectId} = req.params;

    try {
        const existedProject = ProjectRepository.findById(parseInt(projectId))
        if(!existedProject) {
            res.status(400).send({ error: `project with id = ${projectId} not exist` });
        }

        const projectCollaborators = existedProject.allCollaborators();
        res.send(projectCollaborators);
        return;
    } catch (error) {
        res.status(500).send(error);
    }
}
