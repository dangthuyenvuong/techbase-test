
import User from '../models/user';
import AbstractController from "../core/AbstractController";

class Controller extends AbstractController {
    constructor() {
        super(User)
    }
}

export default new Controller()
