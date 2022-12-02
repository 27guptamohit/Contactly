import vCard from "./vcard";
import formatter from "./formatter";

export function getContactCard(profile) {
  var contactCard = vCard();
  contactCard.formattedName = profile.title;
  contactCard.socialUrls = profile.Phone
  console.log(profile)
  console.log(contactCard);
  return formatter.getFormattedString(contactCard);
}
