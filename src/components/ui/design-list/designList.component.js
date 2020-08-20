import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import ItemsCarousel from "react-items-carousel";
import Button from "@material-ui/core/Button";

const DesignListComponent = ({label, items, handleClick}) => {
    const [activeItemIndex, setActiveItemIndex] = React.useState(0);
    const chevronWidth = 40;
    return (
        <Box style={{padding: `0 ${chevronWidth}px`}}>
            <Box pt={1} pb={1}>
                <Typography variant="subtitle1" color="textSecondary">{label}</Typography>
            </Box>
            {
                items.length > 0 ?
                    <ItemsCarousel
                        requestToChangeActive={setActiveItemIndex}
                        activeItemIndex={activeItemIndex}
                        numberOfCards={Math.round(window.innerWidth / 300)}
                        leftChevron={<Button>{'<'}</Button>}
                        rightChevron={<Button>{'>'}</Button>}
                        gutter={20}
                        outsideChevron
                        chevronWidth={chevronWidth}
                        disableSwipe={false}
                    >
                        {items.map((item, index) => (
                            <Button fullWidth key={index}
                                    onClick={() => {
                                        handleClick(item);
                                    }}
                                    style={{
                                        height: 140,
                                        borderRadius: 10,
                                        padding: 2,
                                        overflow: 'hidden',
                                        background: '#EEE',
                                        maxWidth: 300
                                    }}>
                                <Box>
                                    {item.name}
                                </Box>
                            </Button>

                        ))}
                    </ItemsCarousel>
                    : ''
            }
        </Box>
    );
}
export default DesignListComponent;
