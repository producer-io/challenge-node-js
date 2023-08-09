import express from 'express';
import bodyParser from 'body-parser';
import {createProjectController} from "./project/controllers/create-project.controller";
import {listProjectsController} from "./project/controllers/list-projects.controller";
import {createProjectCollaboratorController} from "./project/controllers/create-project-collaborator.controller";
import {listProjectCollaboratorsController} from "./project/controllers/list-projects-collaborators.controller";

const bootstrap = async () => {
    const app = express();
    app.use(bodyParser.json());
    const port = 3000;

    app.post('/projects', createProjectController);
    app.get('/projects', listProjectsController);

    app.post('/projects/collaborator', createProjectCollaboratorController);
    app.get('/projects/:id/collaborators', listProjectCollaboratorsController);

    app.listen(port, () => {
        console.log(`Api listening at http://localhost:${port}`);
    });
}

bootstrap()
    .then(() => {
        console.log('> Application started');
    });
