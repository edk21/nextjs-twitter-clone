import { HomeIcon } from "@heroicons/react/solid"
import { HashtagIcon, BellIcon, InboxIcon, BookmarkIcon, ClipboardIcon, UserIcon, DotsCircleHorizontalIcon } from "@heroicons/react/outline"

export const menuItems = [
    {
        text: 'Home',
        Icon: HomeIcon,
        Active: "active"
    },
    {
        text: 'Explore',
        Icon: HashtagIcon,
    },
    {
        text: 'Notifications',
        Icon: BellIcon,
    },
    {
        text: 'Messages',
        Icon: InboxIcon,
    },
    {
        text: 'Bookmarks',
        Icon: BookmarkIcon,
    },
    {
        text: 'Lists',
        Icon: ClipboardIcon,
    },
    {
        text: 'Profile',
        Icon: UserIcon,
    },
    {
        text: 'More',
        Icon: DotsCircleHorizontalIcon,
    }
]