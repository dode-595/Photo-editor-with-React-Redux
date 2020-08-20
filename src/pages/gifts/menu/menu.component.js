import React from "react";
import MenuIconComponent from "../../../components/ui/menu-icon/menuIcon.component";
import ListItem from "@material-ui/core/ListItem";
import Icon from "@material-ui/core/Icon";
import {useDispatch, useSelector} from "react-redux";
import {getCurrent, setClose, setCurrent, setOpen} from "../../../components/ui/sub-menu/subMenuSlicer";

const MenuGiftComponent = () => {
    const dispatch = useDispatch();
    const current = useSelector(getCurrent);

    const setCurrentMenu = (name) => {
        if (current === name) {
            dispatch(setCurrent(null));
            dispatch(setClose());
        } else {
            dispatch(setCurrent(name));
            dispatch(setOpen());
        }
    }

    return (
        <div id="sideBar">
            <ListItem button onClick={() => {
                setCurrentMenu('photos_editor');

            }}>
                <MenuIconComponent title="Fotos" subtitle="">
                    <Icon style={{fontSize: 40, color: 'grey'}}>photo_filter</Icon>
                </MenuIconComponent>
            </ListItem>
            <ListItem button onClick={() => {
                setCurrentMenu('themes_editor');
            }}>
                <MenuIconComponent title="Tema" subtitle="">
                    <Icon style={{fontSize: 40, color: 'grey'}}>photo_filter</Icon>
                </MenuIconComponent>
            </ListItem>
            <ListItem button onClick={() => {
                setCurrentMenu('themes_model');

            }}>
                <MenuIconComponent title="Modelo" subtitle="">
                    <Icon style={{fontSize: 40, color: 'grey'}}>photo_filter</Icon>
                </MenuIconComponent>
            </ListItem>
            <ListItem button onClick={() => {
                setCurrentMenu('themes_size');

            }}>
                <MenuIconComponent title="Tamanho" subtitle="">
                    <Icon style={{fontSize: 40, color: 'grey'}}>photo_filter</Icon>
                </MenuIconComponent>
            </ListItem>
            <ListItem button onClick={() => {
                setCurrentMenu('themes_text');

            }}>
                <MenuIconComponent title="Texto" subtitle="">
                    <Icon style={{fontSize: 40, color: 'grey'}}>photo_filter</Icon>
                </MenuIconComponent>
            </ListItem>
        </div>
    );
}
export default MenuGiftComponent;
