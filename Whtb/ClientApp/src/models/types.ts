import * as loginStore from "../store/loginStore";
import { RouteComponentProps } from 'react-router';

export type AccountProps =
loginStore.initialStateType &
RouteComponentProps<{}>;