import { useEffect, useState } from "react";

interface VariantProps {
  dataAttriubute: Attribute[];
  dataVariant: Variant[];
  setImage: (value: string) => void;
  setVariant: (value: Variant) => void;
  keyReset?: number;
}

const Variant = ({ dataAttriubute, dataVariant, setImage, setVariant, keyReset }: VariantProps) => {
  const [attributeSelected, setAttributeSelected] = useState<{
    [key: string]: string;
  }>({});
  const [varinatIdInvalid, setVariantIdInvalid] = useState<string[]>([]);

  useEffect(() => {
    setAttributeSelected({});
  }, [keyReset]);

  useEffect(() => {
    if (dataAttriubute.length === 1) {
      const invalidVariants: string[] = [];
      dataVariant.forEach((variant) => {
        if (variant.stock === 0) {
          invalidVariants.push(variant.tier_index[0]);
        }
      });
      setVariantIdInvalid(invalidVariants);
    }

    return () => {
      setAttributeSelected({});
    };
  }, [dataAttriubute.length, dataVariant]);

  const handleChangeAttribute = (key: string, idAttribute: string, image: undefined | string) => {
    const newAttribute = { ...attributeSelected };
    if (newAttribute[key] === idAttribute) {
      delete newAttribute[key];
    } else {
      newAttribute[key] = idAttribute;
    }
    const attributeIds = Object.values(newAttribute);
    if (attributeIds.length === dataAttriubute.length) {
      const variant = dataVariant.find((item) => {
        const newSet = new Set([...attributeIds, ...item.tier_index]);
        if (newSet.size === attributeIds.length) {
          return true;
        }
      });
      setVariant(variant as Variant);
    }
    if (dataAttriubute.length !== 1) {
      const invalidVariants: string[] = [];
      for (const idAttr of attributeIds) {
        dataVariant.forEach((variant) => {
          variant.tier_index.forEach((tier) => {
            const shouldAddTier =
              variant.stock === 0 &&
              variant.tier_index.includes(idAttr) &&
              tier !== idAttr &&
              !invalidVariants.includes(tier);

            if (shouldAddTier) {
              invalidVariants.push(tier);
            }
          });
        });
      }
      setVariantIdInvalid(invalidVariants);
    }

    if (image) {
      setImage(image);
    }
    setAttributeSelected(newAttribute);
  };

  return (
    <div className="">
      {dataAttriubute.map((attr) => (
        <div key={attr._id} className="mt-3">
          <p className="font-semibold">{attr.name}</p>
          <div className="flex items-center justify-start flex-wrap gap-3 mt-2">
            {attr.values.map((variant) => (
              <button
                disabled={varinatIdInvalid.includes(variant._id)}
                key={variant._id}
                className={`button-variant ${
                  attributeSelected[attr.name] === variant._id && "active-variant"
                }`}
                onClick={() => handleChangeAttribute(attr.name, variant._id, variant.image)}
              >
                {variant.name}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Variant;
