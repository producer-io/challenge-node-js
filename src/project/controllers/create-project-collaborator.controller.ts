import {Request, Response} from "express";
import {Project} from "../models/project";
import {ProjectRepository} from "../repositories/project.repository";

export const createProjectCollaboratorController = async (req: Request, res: Response) => {
    const {body: {email}, params: {projectId}} = req;

    // client validations
    if(projectId == undefined) {
        res.status(400).send({ error: 'project id not exist' });
        return;
    }

    if(email == undefined) {
        res.status(400).send({ error: 'collaborator email not exist' });
        return;
    }

    if(!validateEmail(email)) {
        res.status(400).send({ error: 'email not valid' });
        return;
    }

    const id = parseInt(projectId);
    try {
        const existedProject = ProjectRepository.findById(id);
        if(!existedProject) {
            res.status(400).send({ error: `project with id = ${id} not exist` });
            return;
        }

        existedProject.addCollaborator({email});
        res.send(existedProject);
        return;
    } catch (error) {        
        res.status(400).send({error: 'Collaborator with this email exist before'} );
        return;
    }
}

const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
};

