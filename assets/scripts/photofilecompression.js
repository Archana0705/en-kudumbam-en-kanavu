const premises_photo_image = async (event) => {
  const files = event.files;
  // No files selected

  const result = {
    photos: [],
    altitude: null,
    latitude: null,
    longitude: null,
    orientation: null,
    dateTime: null,
  };

  // We'll store the files in this data transfer object
  const dataTransfer = new DataTransfer();

  for (const file of files) {
    if (file.type.startsWith('image')) {
      // Compress the image by 50%
      const compressedFile = await compressImage(file, {
        quality: 0.5,
        type: 'image/jpeg',
      });

      // Save the compressed file
      dataTransfer.items.add(compressedFile);
    } else {
      // Add non-image files as is
      dataTransfer.items.add(file);
    }
  }

  // Update the event object with the modified files
  event.files = dataTransfer.files;
  console.log(event.files);

  // Get geolocation data from localStorage
  const geolocation = JSON.parse(window.localStorage.getItem('geolocation'));
  result.altitude = geolocation.altitude;
  result.latitude = geolocation.latitude.toFixed(6);
  result.longitude = geolocation.longitude.toFixed(6);

  let photo_capture_flag = false;

  // window.addEventListener('deviceorientation', function (event) {
  //   if (photo_capture_flag === false) {
  //     result.orientation = event.alpha.toFixed(3) + ',' + event.beta.toFixed(3) + ',' + event.gamma.toFixed(3);
  //     photo_capture_flag = true;
  //   }
  // });

  // Get the current date and time
  const d = new Date();
  result.dateTime = d.toISOString();

  // Get the first selected file (if any) and update result.photos
  const file1 = event.files[0];
  if (file1) {
    result.photos.push(URL.createObjectURL(file1));
  }

  return result;
};

  /*START : Image compress*/
const compressImage = async (file, { quality = 1, type = file.type }) => {
  // Get as image data
  const imageBitmap = await createImageBitmap(file);

  // Draw to canvas
  const canvas = document.createElement('canvas');
  canvas.width = imageBitmap.width;
  canvas.height = imageBitmap.height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(imageBitmap, 0, 0);

  // Turn into Blob
  const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, type, quality)
  );

  // Turn Blob into File
  return new File([blob], file.name, {
      type: blob.type,
  });
};