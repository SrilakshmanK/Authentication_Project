export const formatDate = (dateString) => {
  const date = new Date(dateString);
  if(isNaN(date.getDate())){
    return "Invalid Date";
  }
  return date.toLocaleDateString("en-IN",{
    timeZone:"Asia/Kolkata",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour:"2-digit",
    minute:"2-digit",
    hour12:true,

  });
} ;