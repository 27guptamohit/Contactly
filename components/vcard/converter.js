import vCard from "./vcard";
import formatter from "./formatter";
import { CONTACT_KEYS } from "../../utils/constants";
export function getContactCard(profile, note) {
  var contactCard = vCard();
  contactCard.firstName = profile?.firstName;
  contactCard.lastName = profile?.lastName;
  contactCard.cellPhone = profile?.cellPhone;
  contactCard.workPhone = profile?.workPhone;
  contactCard.email = profile?.email;
  contactCard.workEmail = profile?.workEmail;
  contactCard.organization = profile?.organization;
  contactCard.title = profile?.title;
  contactCard.birthday = new Date(profile?.birthday);
  contactCard.url = profile?.url;
  contactCard.socialUrls[CONTACT_KEYS.facebook] = profile?.facebook;
  contactCard.socialUrls[CONTACT_KEYS.gitHub] = profile?.gitHub;
  contactCard.socialUrls[CONTACT_KEYS.instagram] = profile?.instagram;
  contactCard.socialUrls[CONTACT_KEYS.snapchat] = profile?.snapchat;
  contactCard.socialUrls[CONTACT_KEYS.tiktok] = profile?.tiktok;
  contactCard.socialUrls[CONTACT_KEYS.whatsApp] = profile?.whatsApp;
  contactCard.socialUrls[CONTACT_KEYS.weChat] = profile?.weChat;
  contactCard.socialUrls[CONTACT_KEYS.linkedIn] = profile?.linkedIn;
  contactCard.note = note;
  return formatter.getFormattedString(contactCard);
}
