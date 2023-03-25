import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID

let regions

export default class RegionsDAO {
  static async injectDB(conn) {
    if (regions) {
      return
    }
    try {
      regions = await conn.db("years").collection("regions")
    } catch (e) {
      console.error(`Unable to establish collection handles in regionDAO: ${e}`)
    }
  }

  static async addRegion(yearID, region) {
    try {
      const regionDoc = {
        yearID: yearID,
        region: region,
      }
      console.log("adding")
      return await regions.insertOne(regionDoc)
    } catch (e) {
      console.error(`Unable to post region: ${e}`)
      return { error: e }
    }
  }

  static async getRegion(regionId) {
    try {
      return await regions.findOne({ _id: ObjectId(regionId) })
    } catch (e) {
      console.error(`Unable to get region: ${e}`)
      return { error: e }
    }
  }

  static async updateRegion(regionId, region) {
    try {
      const updateResponse = await regions.updateOne(
        { _id: ObjectId(regionId) },
        { $set: {region: region} }
      )

      return updateResponse
    } catch (e) {
      console.error(`Unable to update region: ${e}`)
      return { error: e }
    }
  }

  static async deleteRegion(regionId) {
    try {
      const deleteResponse = await regions.deleteOne({
        _id: ObjectId(regionId),
      })

      return deleteResponse
    } catch (e) {
      console.error(`Unable to delete region: ${e}`)
      return { error: e }
    }
  }

  static async getRegionsByYearID(yearID) {
    try {
      const cursor = await regions.find({yearID: yearID})
      return cursor.toArray()
    } catch (e) {
      console.error(`Unable to get region: ${e}`)
      return { error: e }
    }
  }

}