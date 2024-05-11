import { Router } from "express";

const router = Router()
var a = 1

router.get('/', (req, res) =>
{
    res.render("page")
})

export {router} 