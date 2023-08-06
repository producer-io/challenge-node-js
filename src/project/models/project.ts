export class Project{
    name: string;
    collaborators ?: string[];
    constructor(name: string,collaborators ?: string[]) {
        this.name = name;
        this.collaborators = collaborators || [];
    }

    addCollaborator?(email: string){
        if(this.collaborators!.includes(email)){
            throw new Error('Cannot add a collaborator with the same email twice');
        }
        else{
            this.collaborators!.push(email);
        }
    }

    listCollaborators?(){
        return this.collaborators;
    }
}
