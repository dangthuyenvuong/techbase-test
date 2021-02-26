import express from 'express'
import department from '../models/department'
import team from '../models/team'
import user from '../models/user'

const router = express.Router()

router.get('/', async (req, res, next) => {
    let d = await department.find().exec()
    // for (let i in d) {
    //     for (let j = 0; j < 10; j++) {
    //         let t = new team({
    //             department: d[i]._id,
    //             name: `Team ${d[i].name}-${j}`
    //         })
    //         t.save()
    //     }
    // }

    let t = await team.find().exec()
    for (let i in t) {
        let people: any = []
        for (let j = 0; j < 200; j++) {
            let u;
            if (j === 0) {
                u = new user({
                    department: d[i]._id,
                    userType: 'leader',
                    firstName: 'Nguyễn',
                    lastName: `Văn A-${i}`
                })


            } else {
                u = new user({
                    department: d[i]._id,
                    userType: 'staff',
                    firstName: 'Trần',
                    lastName: `Văn B-${j}`
                })
            }
            let temp = await u.save()
            people.push(temp._id)
        }
        t[i].manager = people[0]
        t[i].people = people
        t[i].save()
            .catch(error => {
                console.log(error)
            })
    }

})

export = router