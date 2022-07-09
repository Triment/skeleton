import { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "../../../lib/withSession";

const handler = (req:NextApiRequest, res:NextApiResponse)=> {
    if (!!req.session.user) {
        res.json(req.session.user)
    } else
    res.json(null)
}

export default withSessionRoute(handler)