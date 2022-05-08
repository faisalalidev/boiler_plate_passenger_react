// @flow
import RNImagePicker from "react-native-image-picker";

const OPTIONS = {
  title: "Select Image",
  takePhotoButtonTitle: "Camera",
  chooseFromLibraryButtonTitle: "Gallery",
  cancelButtonTitle: "cancel",
  quality: 0.2
};

class MediaPicker {
  showImagePicker = cb => {
    RNImagePicker.showImagePicker(OPTIONS, response => {
      if (response.didCancel) {
        // User cancelled image picker
      } else if (response.error) {
        // ImagePicker Error: response.error
      } else if (response.customButton) {
        // User tapped custom button: response.customButton
      } else {
        // Image URI: response.uri
      }

      if (cb) cb(response);
    });
  };
}

export default new MediaPicker();
