import express from "express"
import RegionCtrl from "./regions.controller.js"

const router = express.Router()

router.route("/yearID/:yearID").get(RegionCtrl.apiGetRegions)
router.route("/new").post(RegionCtrl.apiPostRegion)
router.route("/:id")
    .get(RegionCtrl.apiGetRegion)
    .put(RegionCtrl.apiUpdateRegion)
    .delete(RegionCtrl.apiDeleteRegion)

export default router