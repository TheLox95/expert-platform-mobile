import React from 'react';

import { List, ListItem, Text, Container } from "native-base";
import { useNavigationParam  } from 'react-navigation-hooks'
import Wrapper from "../state/Wrapper";
import { WrappedComponent } from "../state/WrappedComponent";
import { useEffect } from 'react';
import { useState } from 'react';
import { Offering } from '../models';
import Skeleton from '../tools/skeleton';

const OfferingPage: WrappedComponent = ({ requests }) => {
    const [ offerings, updateOfferings ] = useState<Offering[]>([]);
    const [ selectedId, updateSelectedId ] = useState(-1);
    const offering = useNavigationParam('offering');

    return (
      <Text>{offering.name}</Text>
    );
}

export default Wrapper(OfferingPage);