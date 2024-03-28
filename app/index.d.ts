interface StudyGroupProps {
  title: string;
  type: string;
  users: Array<string>;
  gradient: [string, string];
  count: string;
}
interface CircularImageOverlayProps {
  mainImage: string[]; // Allow for both static and dynamic image sources
  orbitImages: {
    source: string;
    position: {
      left: number;
      top: number;
    };
  }[];
}
