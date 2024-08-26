import { Image } from "@chakra-ui/react";
import imgCETIC from '../../../assets/img/Group-2.png';

export const FooterCetic = () => {

    return (
        <>
            <footer>
                <Image src={imgCETIC}
                w={{lg:'80px', md: '80px', sm:'40px'} }
                h={{lg:'25px', md: '25px', sm:'20px'} }
                />
            </footer>
        </>)
};
