export interface Collaborator {
    email: string;
}
export class Project {
    name: string;
    collaborators: Collaborator[];

    constructor(name: string) {
        this.name = name;
        this.collaborators = [];
    }

    addCollaborator(collaborator: Collaborator) {
        const existedCollaborator = this.findCollaborator(collaborator.email);        
        if(existedCollaborator == undefined) {
            this.collaborators.push(collaborator);

            return collaborator;
        } else {            
            throw new Error();
        }
    }

    findCollaborator(email: string) {
        return this.collaborators.find(element => element.email == email);
    }

    allCollaborators() {
        return this.collaborators;
    }
}
