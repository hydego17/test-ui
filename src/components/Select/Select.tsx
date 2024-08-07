import React, {
  useCallback,
  useDeferredValue,
  useEffect,
  useRef,
  useState,
} from "react";
import { XCircleIcon, ChevronDownIcon, SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useClickOutside } from "@/hooks/use-click-outside";

type Option = { label: string; value: string };

type RenderOptionProps = {
  options: Option[];
  selected: Option[];
  onSelect(opts: Option): void;
  search: string;
};

const RenderOptions = React.memo(
  ({ options, selected, onSelect, search }: RenderOptionProps) => {
    // render label
    const renderOptionLabel = (label: string) => {
      let rendered = label;
      if (search) {
        const normReq = search
          .toLowerCase()
          .replace(/\s+/g, " ")
          .trim()
          .split(" ")
          .sort((a, b) => b.length - a.length);

        rendered = label.replace(
          new RegExp(`(${normReq.join("|")})`, "gi"),
          (match) => "<mark>" + match + "</mark>"
        );
      }

      return rendered;
    };

    return (
      <div className="smooth-scrollbar max-h-[200px] overflow-auto py-2">
        {options.length ? (
          options?.map((opt) => {
            const alreadySelected = selected.find((i) => i.value === opt.value);

            return (
              <div
                key={opt.value}
                role="button"
                onClick={() => onSelect(opt)}
                className={cn(
                  "text-sm px-2 py-1",
                  alreadySelected ? "bg-gray-100" : "hover:bg-gray-100"
                )}
                dangerouslySetInnerHTML={{
                  __html: renderOptionLabel(opt.label),
                }}
              ></div>
            );
          })
        ) : (
          <div className="text-slate-500 text-sm p-2">No item found</div>
        )}
      </div>
    );
  }
);

type SelectProps = React.ComponentProps<"div"> & {
  label?: React.ReactNode;
  options: Option[];
  multiple: boolean;
  withSearch: boolean;
  onChange?: (options: Option[]) => void;
  placeholder?: string;
};

const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      label = "Select Options",
      multiple = false,
      options = [],
      withSearch = false,
      onChange,
      placeholder,
      className,
      ...props
    },
    ref
  ) => {
    const [selected, setSelected] = useState<Option[]>([]);
    const [search, setSearch] = useState("");
    const [opened, setOpened] = useState(false);

    const defferedSearch = useDeferredValue(search);

    const areaRef = useClickOutside(() => setOpened(false));
    const searchRef = useRef<HTMLInputElement>(null);

    const filteredOptions = defferedSearch
      ? options.filter((item) => {
          const matchLabel = !!item.label
            .toLowerCase()
            .includes(defferedSearch.toLowerCase());

          return matchLabel;
        })
      : options;

    useEffect(() => {
      onChange && onChange(selected);
    }, [onChange, selected]);

    useEffect(() => {
      if (withSearch && opened) {
        searchRef.current?.focus();
      }
    }, [withSearch, opened]);

    useEffect(() => {
      if (!multiple && selected.length > 1) {
        setSelected((prev) => [prev[0]]);
      }
    }, [multiple, selected.length]);

    const handleTrigger = useCallback(() => {
      setOpened((prev) => !prev);
    }, []);

    const handleSelect = useCallback(
      (item: Option) => {
        if (multiple) {
          const alreadyIncluded = !!selected.find(
            (s) => s.value === item.value
          );
          if (alreadyIncluded) return;
          setSelected((prev) => [...prev, item]);
        } else {
          setSelected([item]);
        }
      },
      [multiple, selected]
    );

    const handleRemove = useCallback((item: Option) => {
      setSelected((prev) => prev.filter((s) => s.value !== item.value));
    }, []);

    return (
      <div
        ref={areaRef}
        className={cn("relative w-[400px]", className)}
        {...props}
      >
        {label && <div className="p-0.5 text-sm text-gray-700">{label}</div>}

        {/* Select Trigger */}
        <div
          ref={ref}
          onClick={handleTrigger}
          className={cn(
            "cursor-pointer p-1.5 border transition-colors min-h-[35px] rounded flex items-center justify-between gap-2",
            opened ? "border-blue-400" : "hover:border-blue-400"
          )}
        >
          <div className="relative z-10 flex-1 flex flex-wrap gap-1.5">
            {selected.length ? (
              selected.map((item) => (
                <div
                  key={item.value}
                  role="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(item);
                  }}
                  className="flex items-center gap-1 px-1 rounded text-[11px] border bg-gray-200 hover:bg-red-100 h-fit transition-colors"
                >
                  <span>{item.label}</span>
                  <XCircleIcon size={12} />
                </div>
              ))
            ) : (
              <span className="text-mini text-gray-400">{placeholder}</span>
            )}
          </div>

          <div className="flex items-start">
            <ChevronDownIcon size={16} className="text-slate-500" />
          </div>
        </div>

        {/* Select Dropdown */}
        <div
          role="presentation"
          className={cn(
            "absolute z-[99999] top-[120%] left-0 right-0 text-sm rounded shadow-lg",
            opened
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          <div className="border rounded overflow-hidden">
            {withSearch && (
              <div className="flex relative border-b">
                <div className="p-2 centered">
                  <SearchIcon size={15} className="text-gray-500" />
                </div>

                <input
                  ref={searchRef}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  autoFocus
                  className="flex-1 outline-none rounded-sm py-2 w-full text-sm text-gray-700 placeholder:text-gray-400 placeholder:text-sm"
                  placeholder="Search by label"
                />
              </div>
            )}

            <RenderOptions
              options={filteredOptions}
              selected={selected}
              onSelect={handleSelect}
              search={defferedSearch}
            />
          </div>
        </div>
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
