// DropDown.tsx
import Button from "@/elements/Button";
import { useAppStore } from "@/store";
import { t, ucFirst } from "@/utils/helpers";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";

interface DropDownProps {
  label: string;
  data: Array<string>;
  onSelect: (value: any) => void;
  actions: () => React.ReactNode;
}

export const DropDown: React.FC<DropDownProps> = ({
  label,
  data,
  onSelect,
  actions,
}) => {
  const { locale } = useAppStore();
  const [isVisible, setIsVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  const handleSelect = (value: any) => {
    setSelectedValue(value);
    onSelect(value);
    setIsVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setIsVisible(true)}
      >
        <Text>
          {label === "daily" || label === "weekly" || label === "monthly"
            ? t(selectedValue as any)
            : ucFirst(label)}
        </Text>
      </TouchableOpacity>
      <Modal visible={isVisible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContent}>
          <FlatList
            data={data}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => handleSelect(item)}
              >
                <Text>{t(item as any)}</Text>
              </TouchableOpacity>
            )}
          />
          <View style={styles.actionsContainer}>
            {actions()}
            <Button
              text={t("create")}
              disabled={false}
              onPress={() => {
                setIsVisible(false);
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignSelf: "stretch",
    backgroundColor: "#FAFAFA",
    borderRadius: 100,
  },
  dropdownButton: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: "#9AA5B5",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    position: "absolute",
    top: "30%",
    left: "10%",
    right: "10%",
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingVertical: 16,
    paddingHorizontal: 12,
    elevation: 5,
  },
  item: {
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  actionsContainer: {
    marginTop: 10,
  },
});
