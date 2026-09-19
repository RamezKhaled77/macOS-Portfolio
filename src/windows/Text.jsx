import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";
import useWindowStore from "#store/window";

const Text = () => {
  const { windows } = useWindowStore();
  const { data } = windows.txtfile;

  if (!data) return null;

  const { name, image, subtitle, description = [] } = data;

  return (
    <>
      <div id="window-header">
        <WindowControls target="txtfile" />
        <h2>{name}</h2>
      </div>

      <article className="p-6 bg-white">
        {image && <img src={image} alt={name} className="w-full rounded-md" />}
        {subtitle && <h3 className="mt-4 text-lg font-semibold">{subtitle}</h3>}
        <div className="mt-2 font-medium space-y-4 text-sm leading-6 text-gray-800">
          {description.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>
    </>
  );
};

const TextWindow = WindowWrapper(Text, "txtfile");

export default TextWindow;
