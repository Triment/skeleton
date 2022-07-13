import { NextApiRequest, NextApiResponse } from 'next';
import { DataBase } from '../../../../database';
import { Menu, Role } from '../../../../database/model';
import { withDB } from '../../../../util/ApiWrapper';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const body = JSON.parse(req.body)
    //获取关系
    const role = await DataBase.manager.findOne(Role, {
        where: {id: body.id}
    })
    const menus = await DataBase.getRepository(Role)
    .createQueryBuilder()
    .relation(Role, 'menus')
    .of(role).loadMany()

    var Menus: Menu[]
    Menus = []
    for (let item of body.menus) {
        const menu = (await DataBase.getRepository(Menu)
            .createQueryBuilder('menu')
            .where('menu.id=:id', { id: item.id })
            .getOne())!
        DataBase.manager.update
        Menus.push(menu)
    }
    try {
        //删除并更改关系
        await DataBase.getRepository(Role)
        .createQueryBuilder()
        .relation(Role, 'menus')
        .of(role)
        .addAndRemove(Menus, menus)
        res.status(200).json({Menus});
    } catch (err) {
        console.log('错误', err)
    }

};
export default withDB(handler);
