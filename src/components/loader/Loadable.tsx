import { LinearProgressProps } from '@mui/material/LinearProgress';
import { Suspense } from 'react';
import Loader from './Loader';

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

interface LoaderProps extends LinearProgressProps {}

const Loadable = (Component: any) => (props: LoaderProps) =>
    (
        <Suspense fallback={<Loader />}>
            <Component {...props} />
        </Suspense>
    );

export default Loadable;