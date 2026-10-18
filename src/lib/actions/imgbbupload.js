
export const handleImgUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("image", file);

  try {
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();

    if (data.success) {
      setLogoUrl(data.data.url);
    } else {
      alert("Failed to upload image to ImgBB.");
    }
  } catch (err) {
    console.error("Upload error:", err);
    alert("An error occurred during image upload.");
  } finally {
    setIsUploading(false);
  }
};