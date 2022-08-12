/*eslint-disable*/
class Command {
    action = function() {
        console.log("hello")
    }

    constructor (id, action, description){
        this.id = id
        this.action = action
        this.description = description

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

export default class CommandCreator {

    constructor(commands=[]){
        this.commands = commands
    }

    createCommand(id, action, description=""){
        this.commands.push(new Command(id, action, description))
    }

    getCommandCount(){
        return this.commands.length
    }

    startAction(id){
        var command = this.commands.filter(com => {
            return com.id == id
        })
        console.log(command, id)
        command.action()
    }

}