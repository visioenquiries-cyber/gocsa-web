/**
 * @gocsa/ui — the UI Primitive Library.
 *
 * Token-driven, accessible, theme-aware building blocks. **Primitives only** — no
 * page components or layouts (those compose these in later sprints, docs/11).
 * Complex interaction behaviour is provided by Radix UI behind the GOCSA API.
 * Consumers must load the theme once: `import "@gocsa/tokens/variables.css"`.
 */
export { cn } from "./utils/cn";

export { VisuallyHidden } from "./primitives/VisuallyHidden";

/* Layout */
export {
  Box,
  Surface,
  Container,
  Stack,
  Inline,
  Grid,
  Divider,
  type BoxProps,
  type SurfaceProps,
  type ContainerProps,
  type StackProps,
  type InlineProps,
  type GridProps,
  type DividerProps,
} from "./primitives/layout";

/* Typography */
export {
  Text,
  Heading,
  Paragraph,
  Link,
  type TextProps,
  type HeadingProps,
  type ParagraphProps,
  type LinkProps,
} from "./primitives/typography";

/* Content atoms */
export { Icon, type IconProps, type IconSize } from "./primitives/Icon";
export { Badge, type BadgeProps } from "./primitives/Badge";
export { Card, type CardProps } from "./primitives/Card";
export {
  Progress,
  Avatar,
  Chip,
  type ProgressProps,
  type AvatarProps,
  type ChipProps,
} from "./primitives/data-display";
export { Image, Video, type ImageProps, type VideoProps } from "./primitives/media";

/* Actions */
export { Button, buttonVariants, type ButtonProps } from "./primitives/Button";
export { IconButton, type IconButtonProps } from "./primitives/IconButton";

/* Forms */
export {
  Input,
  Textarea,
  useFieldIds,
  type InputProps,
  type TextareaProps,
  type FieldIds,
} from "./primitives/form";
export {
  Checkbox,
  RadioGroup,
  Switch,
  type CheckboxProps,
  type RadioGroupProps,
  type RadioOption,
  type SwitchProps,
} from "./primitives/choice";
export { Select, type SelectProps, type SelectOption } from "./primitives/Select";

/* Disclosure & navigation */
export { Tabs, type TabsProps, type TabItem } from "./primitives/Tabs";
export { Accordion, type AccordionProps, type AccordionItem } from "./primitives/Accordion";

/* Overlays */
export {
  Dialog,
  Drawer,
  DialogRoot,
  DialogTrigger,
  DialogClose,
  type DialogProps,
  type DrawerProps,
} from "./primitives/overlays";
export { Popover, type PopoverProps } from "./primitives/Popover";
export { Tooltip, TooltipProvider, type TooltipProps } from "./primitives/Tooltip";
export { ToastProvider, useToast, type ToastOptions } from "./primitives/Toast";

/* Feedback */
export { Spinner, Skeleton, type SpinnerProps, type SkeletonProps } from "./primitives/feedback";
