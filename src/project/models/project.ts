export class Project {
    name: string;

    constructor(name: string,private collaborators: string[] = []) {
        this.name = name;
    }

    addCollaborator(email: string): void{
        if(this.collaborators.includes(email)){
            throw new Error('Cannot add a collaborator with the same email twice');
        }
        else{
            this.collaborators.push(email);
        }
    }

    listCollaborators(){
        return this.collaborators;
    }
}
