import { ScrollView, StyleSheet, View } from "react-native";
import CheckboxGroup from "../CheckBoxGroup";
import Checkbox from "../CheckBox";
import Button from "@/elements/Button";
import { t } from "@/utils/helpers";
import { useAppStore } from "@/store";

export function SubjectPicker({
  onChange,
  onAction,
}: {
  onChange: ({
    current,
    selected,
  }: {
    current: string;
    selected: string[];
  }) => void;
  onAction: () => void;
}) {
  const { locale } = useAppStore();
  const subjects = [
    "Chemistry",
    "Physics",
    "Psychology",
    "Islamic",
    "English",
    "Geography",
    "Economy",
    "Mathematics",
    "Arabic",
    "History",
  ];
  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <CheckboxGroup onChange={onChange}>
          {subjects.map((label, index) => (
            <Checkbox
              isRadio={true}
              isChecked={false}
              onPress={() => {}}
              key={index}
              value={label}
              // @ts-ignore
              label={locale === "en" ? label : t(label.toLocaleLowerCase())}
            />
          ))}
        </CheckboxGroup>
      </View>
      <View style={styles.btn}>
        <Button disabled={false} text={t("schedule")} onPress={onAction} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 30,
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
  },
});
