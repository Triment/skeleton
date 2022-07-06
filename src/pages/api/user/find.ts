import { DataBase } from '../../../database';
import { User } from '../../../database/model';
import { withDB } from '../../../util/ApiWrapper';

const handler = async (req, res) => {
    const data = await DataBase.manager.findOne(User,
        {
            select: ['role', 'active', 'email', 'id', 'username'],
            where: { username: 'admin' },
            relations: { role: { menus: true } }
        })

    res.status(200).json(data);
};
export default withDB(handler);
