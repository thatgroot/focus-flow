import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { Modalize } from "react-native-modalize";
import { router, useRouter } from "expo-router";
import ShareSuccess from "@/components/ShareSuccess";
import { useAppStore } from "@/store";
import { SubjectPicker } from "@/components/schedules/SubjectPicker";
import { ScheduleModal } from "@/components/schedules/ScheduleModal";
import ShareModal from "@/components/ShareModal";
import { IHandles } from "react-native-modalize/lib/options";
import { t } from "@/utils/helpers";

const AddToPlanner = () => {
  const { type, tags, setScheduleItem,  } = useAppStore();

  const [data, setData] = useState<Schedule>({
    startDate: new Date(),
    endDate: new Date(),
    startTime: new Date(),
    endTime: new Date(),
    note: "",
    schedule: "daily",
    completionStatus: false,
    tags,
  });

  const [openModal, setOpenModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [modelRef, setModalRef] = useState<MutableRefObject<IHandles | undefined>>();

  useEffect(() => {
    setOpenModal(type === "task");
  }, [type]);

  const handleCheckboxChange = ({ current }: { current: string }) => {
    const updatedData = { ...data, subject: current };
    setData(updatedData);
    setScheduleItem(updatedData);
  };

  const handleSubjectPickerAction = () => {
    setOpenModal(true);
    modelRef?.current?.open();
    setScheduleItem(data);
  };

  const handleScheduleModalBack = (_ref: React.MutableRefObject<IHandles | undefined>) => {
    if(_ref){
    setModalRef(_ref);
    setOpenModal(false);
    _ref.current?.close();}
  };

  const handleScheduleModalAction = (_ref: React.MutableRefObject<IHandles | undefined>) => {
    if(_ref){   setModalRef(_ref);
    setShowSuccess(true);
    _ref.current?.close();
    }
  };

  const handleShareSuccessClose = () => {
    setShowSuccess(false);
    setShowShare(true);
    router.push("/schedule")
  };

  const handleShareModalBack = () => {
    setShowShare(false);
    router.push("/schedule");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {type === "class" && (
        <>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <Image
                source={require("@/assets/icons/back.png")}
                style={styles.backBtn}
              />
            </TouchableOpacity>
            <Text style={styles.headerTxt}>{t("add_to_planner")}</Text>
          </View>
          <SubjectPicker
            onChange={handleCheckboxChange}
            onAction={handleSubjectPickerAction}
          />
        </>
      )}

      <ScheduleModal
        open={openModal}
        onBack={handleScheduleModalBack}
        onAction={handleScheduleModalAction}
      />

      {showSuccess && (
        <ShareSuccess
          onClose={handleShareSuccessClose}
          share={() => {}}
        />
      )}

      {/* {!showSuccess && showShare && (
        <ShareModal
          onBack={handleShareModalBack}
        />
      )} */}
    </SafeAreaView>
  );
};

export default AddToPlanner;


const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    gap: 50,
    marginTop: 40,
    // justifyContent:'center',
    alignItems: "center",
    marginLeft: 20,
  },
  headerTxt: {
    fontWeight: "700",
    fontSize: 20,
    lineHeight: 24,
    fontFamily: "Inter-Bold",
    color: "#8D99DE",
  },
  backBtn: {
    width: 20,
    height: 20,
  },

  modalView: {
    paddingHorizontal: 34,
    paddingVertical: 34,
    marginTop: 5,
    width: "100%",
  },

  header2: {
    flexDirection: "row",
    gap: 50,
    marginTop: 40,
    // justifyContent:'center',
    alignItems: "center",
  },

  textArea: {
    fontSize: 15,
    lineHeight: 20,
    fontFamily: "Inter-Regular",
    borderWidth: 1,
    borderColor: "#9AA5B5",
    width: 308,
    height: 127,
    borderRadius: 10,
    paddingLeft: 10,
    marginTop: 20,
    fontWeight: "500",
  },

  containerDate: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  modalBtn: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
