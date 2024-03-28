export function calculatePosition(width_main: number, radius: number, startingAngle = 0, num_images: number) {
 const center_x = width_main / 2;
 const center_y = center_x;
 const angle_increment = 2 * Math.PI / num_images;
 const angle = startingAngle + angle_increment; // Adjust starting angle for specific positioning

 const x_offset = radius * Math.cos(angle);
 const y_offset = radius * Math.sin(angle);

 return {
   left: center_x + x_offset,
   top: center_y + y_offset,
 };
}
export function calculateAngle(index: number, numImages: number) {
 const angleIncrement = 2 * Math.PI / numImages;
 return index * angleIncrement;
}
