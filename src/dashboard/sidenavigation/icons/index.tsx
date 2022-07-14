import DocumentationIcon from './documentation';
import FolderIcon from './folder';
import HomeIcon from './home';
import ProjectsIcon from './projects';
import ReportsIcon from './reports';
import SettingsIcon from './settings';
import TasksIcon from './tasks';
import TimeManageIcon from './time-manage';

const Icons = new Map<string, () => JSX.Element>();
Icons.set('documentation', DocumentationIcon);
Icons.set('home', HomeIcon);
Icons.set('project', ProjectsIcon);
Icons.set('report', ReportsIcon);
Icons.set('setting', SettingsIcon);
Icons.set('task', TasksIcon);
Icons.set('time-manage', TimeManageIcon);
Icons.set('folder', FolderIcon);

export { Icons };
