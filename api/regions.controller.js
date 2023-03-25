import RegionsDAO from "../dao/regionsDAO.js"

export default class RegionsController {
  static async apiPostRegion(req, res, next) {
    try {
			const yearID = req.body.yearID
      const region = req.body.region
      console.log('yearID', yearID)
      const regionResponse = await RegionsDAO.addRegion(
        yearID,
        region
      )
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiGetRegion(req, res, next) {
    try {
      let id = req.params.id || {}
      let region = await RegionsDAO.getRegion(id)
      if (!region) {
        res.status(404).json({ error: "Not found" })
        return
      }
      res.json(region)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }

  static async apiUpdateRegion(req, res, next) {
    try {
      const regionId = req.params.id
      const region = req.body.region

      const regionResponse = await RegionsDAO.updateRegion(
        regionId,
        region
      )

      var { error } = regionResponse
      if (error) {
        res.status(400).json({ error })
      }

      if (regionResponse.modifiedCount === 0) {
        throw new Error(
          "unable to update region",
        )
      }

      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiDeleteRegion(req, res, next) {
    try {
      const regionId = req.params.id
      const regionResponse = await RegionsDAO.deleteRegion(regionId)
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiGetRegions(req, res, next) {
    try {
      let yearID = req.params.yearID || {}
      let regions = await RegionsDAO.getRegionsByYearID(yearID)
      if (!regions) {
        res.status(404).json({ error: "Not found" })
        return
      }
      res.json(regions)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }
}