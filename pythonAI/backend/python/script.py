import easyocr
import sys
import os


def text_recognition(file_path, text_file_name="resalt.txt"):
    reader = easyocr.Reader(["ru", "en"])
    result = reader.readtext(file_path, detail=0, paragraph=True)
   #  print (resalt[0])
   #  tmp_folder_path = os.path.join(os.path.dirname(__file__), 'tmp')
   #  os.makedirs(tmp_folder_path, exist_ok=True)
   #  file_path = os.path.join(tmp_folder_path, text_file_name)
    with open(text_file_name, "w") as file:
       for line in result:
          file.write(f"{line}\n")
    print(text_file_name)
    sys.stdout.flush()
   #  return f"Resalt wrote into{text_file_name}"

def main():
#   file_path = input ("Enter a file path: ")
#   print (text_recognition(file_path=file_path, text_file_name="read_me_first.txt"))
  text_recognition(file_path=sys.argv[1], text_file_name=sys.argv[2])


if __name__ == "__main__":
   main()