// Define the data contracts explicitly for type safety
export interface SubLink {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href?: string;
  children?: SubLink[];
}

export interface UserProfile {
  name: string;
  avatarUrl: string;
}

/**
 * Complete Editor-driven navigation tree structure containing
 * all required primary pages and nested sub-menu dropdown modules.
 */
export const MOCK_NAV_TREE: NavItem[] = [
  // Removed Home route
  {
    label: "About",
    children: [
      { label: "Church History", href: "/about/history" },
      { label: "Leadership", href: "/about/leadership" },
      { label: "Programs", href: "/about/programs" },
      { label: "Ministries", href: "/about/ministries" },
      { label: "Branches", href: "/about/branches" },
      { label: "Services", href: "/about/services" },
    ],
  },
  {
    label: "Sermon",
    href: "/sermons",
  },
  {
    label: "Giving",
    href: "/giving",
  },
  {
    label: "Events",
    href: "/events",
  },
  // Removed contuct us route
  {
    label: "Merchandise",
    href: "/merchandise",
  },
  {
    label: "Downloads",
    children: [
      { label: "Reports", href: "/downloads/reports" },
      { label: "Sermon Clips", href: "/downloads/sermon-clips" },
      { label: "Images", href: "/downloads/images" },
    ],
  },
];

/**
 * Mock Profile Data for the Authenticated State
 */
export const MOCK_USER_PROFILE: UserProfile = {
  name: "Jane Doe",
  avatarUrl:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
};

/**
 * Execution Use-Cases for Component Manifest Testing
 */
export const HEADER_TEST_CASES = {
  unauthenticatedState: {
    navTree: MOCK_NAV_TREE,
    isAuthenticated: false,
    userProfile: undefined,
  },
  authenticatedState: {
    navTree: MOCK_NAV_TREE,
    isAuthenticated: true,
    userProfile: MOCK_USER_PROFILE,
  },
};

export interface SlideItem {
  imageUrl: string;
  heading: string;
  description: string;
}

export interface AnnouncementItem {
  title: string;
  eventDate?: string;
}

export interface HeroProps {
  slides: SlideItem[];
  announcement?: AnnouncementItem;
}

export const mockHeroData: HeroProps = {
  slides: [
    {
      imageUrl:
        "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&w=1200&q=80",
      heading: "Trinitarian Theology Seminar 2026",
      description:
        "Join our comprehensive weekend intensive exploring historical Christological frameworks and modern ecclesial applications.",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1200&q=80",
      heading: "Community Outreach Foundations",
      description:
        "Mobilizing local ministry partnerships to address food security and infrastructure adjustments across Eastgate zones.",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?auto=format&fit=crop&w=1200&q=80",
      heading: "Midweek Liturgical Assemblies",
      description:
        "Refining communal prayer frameworks every Wednesday evening inside the main sanctuary campus.",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&w=1200&q=80",
      heading: "Trinitarian Theology Seminar 2026",
      description:
        "Join our comprehensive weekend intensive exploring historical Christological frameworks and modern ecclesial applications.",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1200&q=80",
      heading: "Community Outreach Foundations",
      description:
        "Mobilizing local ministry partnerships to address food security and infrastructure adjustments across Eastgate zones.",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?auto=format&fit=crop&w=1200&q=80",
      heading: "Midweek Liturgical Assemblies",
      description:
        "Refining communal prayer frameworks every Wednesday evening inside the main sanctuary campus.",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&w=1200&q=80",
      heading: "Trinitarian Theology Seminar 2026",
      description:
        "Join our comprehensive weekend intensive exploring historical Christological frameworks and modern ecclesial applications.",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1200&q=80",
      heading: "Community Outreach Foundations",
      description:
        "Mobilizing local ministry partnerships to address food security and infrastructure adjustments across Eastgate zones.",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?auto=format&fit=crop&w=1200&q=80",
      heading: "Midweek Liturgical Assemblies",
      description:
        "Refining communal prayer frameworks every Wednesday evening inside the main sanctuary campus.",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&w=1200&q=80",
      heading: "Trinitarian Theology Seminar 2026",
      description:
        "Join our comprehensive weekend intensive exploring historical Christological frameworks and modern ecclesial applications.",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1200&q=80",
      heading: "Community Outreach Foundations",
      description:
        "Mobilizing local ministry partnerships to address food security and infrastructure adjustments across Eastgate zones.",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?auto=format&fit=crop&w=1200&q=80",
      heading: "Midweek Liturgical Assemblies",
      description:
        "Refining communal prayer frameworks every Wednesday evening inside the main sanctuary campus.",
    },
  ],
  announcement: {
    title: "Annual Leadership Synod & Budgetary Authorization Forum",
    eventDate: "October 14, 2026 at 09:00 AM EAT",
  },
};

export interface ServiceSchedule {
  title: string;
  slots: string[];
}

export interface ChurchInformation {
  address: string;
  phone: string;
  email: string;
}

export interface FooterPayload {
  services: ServiceSchedule[];
  information: ChurchInformation;
  campuses: string[];
}

export const mockFooterData: FooterPayload = {
  services: [
    {
      title: "Sunday Services",
      slots: [
        "1st Service – 8:15 AM – 10:15 AM",
        "2nd Service – 11:15 AM – 1:15 PM",
      ],
    },
    {
      title: "Wednesday Service",
      slots: ["6:00 PM – 8:00 PM"],
    },
  ],
  information: {
    address: "Prof. Saitoti Ave. (off Ring Road Westlands) Kenya",
    phone: "(+254) 722 845 401",
    email: "reception@parklandsbaptist.org",
  },
  campuses: ["PBC Northgate", "PBC Eastgate"],
};
