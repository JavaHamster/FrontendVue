class Command {
    action = function() {}

    constructor (id, action, description, game){
        this.id = id
        this.action = action
        this.description = description
        this.game = game
    }

    setAction(action) {
        this.action = action
    }
    setId(id){
        this.id = id
    }
    setDescription(description){
        this.description = description
    }

    startAction(){
        this.action()
    }
}

export class CommandCreator {

    constructor(commands=[]){
        this.commands = commands
    }

    createCommand(id, action, description="", game){
        this.commands.push(new Command(id, action, description, game))
    }

    getCommandCount(){
        return this.commands.length
    }

    startAction(id){
        let command = this.commands.filter(com => {
            return com.id == id
        })

        if(command[0] === undefined){
            console.error("UNKNOWN COMMAND:", id)
            return;
        }
        console.log(command[0], id)
        command[0].startAction()
    }

}