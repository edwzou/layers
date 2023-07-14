import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import Icon from 'react-native-remix-icon';
import { FlatList } from 'react-native-gesture-handler';
import GlobalStyles from '../../constants/GlobalStyles';

type DropdownPropsType = {
    label: string;
    data: { label: string; value: string }[];
    onSelect: any
    // onSelect: (item: { label: string; value: string }) => void;
}

const Dropdown = ({ label, data, onSelect }: DropdownPropsType) => {
    const DropdownButton = useRef(null);
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(undefined);
    const [dropdownTop, setDropdownTop] = useState(0);

    const toggleDropdown = (): void => {
        visible ? setVisible(false) : openDropdown();
    };

    const openDropdown = (): void => {
        if (!DropdownButton.current) return;

        DropdownButton.current.measure((_fx: number, _fy: number, _w: number, h: number, _px: number, py: number) => {
            setDropdownTop(py + h);
        });
        setVisible(true);
    };

    const onItemPress = (item: any): void => {
        setSelected(item);
        onSelect(item);
        setVisible(false);
    };

    const renderItem = ({ item }: any) => (
        <Pressable style={styles.item} onPress={() => onItemPress(item)}>
            <Text>{item.label}</Text>
        </Pressable>
    );

    const renderDropdown = () => {
        return (
            <Modal visible={visible} transparent animationType="none">
                <Pressable
                    style={styles.overlay}
                    onPress={() => setVisible(false)}
                >
                    <View style={[styles.dropdown, { top: dropdownTop }]}>
                        <FlatList
                            data={data}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </Pressable>
            </Modal>
        );
    };

    return (
        <Pressable
            ref={DropdownButton}
            style={styles.button}
            onPress={toggleDropdown}
        >
            {renderDropdown()}
            <Text style={styles.buttonText}>
                {(!!selected && selected.label) || label}
            </Text>
            {visible ? <Icon name={GlobalStyles.icons.upFillArrow} /> : <Icon name={GlobalStyles.icons.downFillArrow} />}

        </Pressable>
    )
}

export default Dropdown

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#efefef',
        height: 50,
        zIndex: 1,
    },
    buttonText: {
        flex: 1,
        textAlign: 'center',
    },
    icon: {
        marginRight: 10,
    },
    dropdown: {
        position: 'absolute',
        backgroundColor: '#fff',
        width: '100%',
        shadowColor: '#000000',
        shadowRadius: 4,
        shadowOffset: { height: 4, width: 0 },
        shadowOpacity: 0.5,
    },
    overlay: {
        width: '100%',
        height: '100%',
    },
    item: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderBottomWidth: 1,
    },
});