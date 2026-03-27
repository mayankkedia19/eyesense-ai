import os, cv2
from services.image_processing import analyze_eye_image

base = "../datasets/processed"
classes = ["Anemia", "Cataract", "Glaucoma", "Normal"]

correct = 0
total = 0

print("\nFULL MODEL TEST\n")

for cls in classes:
    folder = os.path.join(base, cls)

    imgs = [f for f in os.listdir(folder)
            if f.lower().endswith(('.jpg','.png'))][:5]

    cls_correct = 0
    print(cls)

    for fname in imgs:
        img = cv2.imread(os.path.join(folder, fname))

        result = analyze_eye_image(img)
        detected = result["condition"]

        match = "OK" if detected == cls else "WRONG"
        print(f"  {match} → {detected} ({result['confidence']})")

        if detected == cls:
            cls_correct += 1

        total += 1

    correct += cls_correct
    print(f"  {cls_correct}/5\n")

print(f"\nFINAL ACCURACY: {correct}/{total} ({100*correct//total}%)\n")