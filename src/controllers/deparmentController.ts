import Department from '../models/department';

import AbstractController from "../core/AbstractController";


class Controller extends AbstractController {
    constructor() {
        super(Department)
    }
}

export default new Controller()