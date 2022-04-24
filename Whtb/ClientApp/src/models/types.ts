import * as userStore from "../store/userStore";
import { RouteComponentProps } from 'react-router';

export type AccountProps =
userStore.initialStateType &
RouteComponentProps<{}>;