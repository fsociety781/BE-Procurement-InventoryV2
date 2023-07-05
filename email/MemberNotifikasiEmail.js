const nodemailer = require("nodemailer");
const path = require("path");
const ejs = require("ejs");

// Fungsi untuk mengirim email ke admin
async function sendEmailToAdmin(item, user, pengajuan) {
  try {
    const namaUser = user.name;
    const namaitem = item.name;
    const qty = item.quantity;
    const price = item.total;
    const waktu = pengajuan.createdAt;
    const deskripsi = item.description;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "info.procurement04@gmail.com",
        pass: "pwsdsrlmxhlltgpa",
      },
    });

    const templatePath = path.resolve(
      __dirname,
      "../template",
      "templateAdmin.ejs"
    );

    // Mengambil isi template HTML
    const template = await ejs.renderFile(templatePath, {
      namaUser,
      namaitem,
      qty,
      price,
      deskripsi,
      waktu,
    });

    const mailOptions = {
      from: "info.procurement04@gmail.com",
      to: "4dmin.procurement@gmail.com",
      subject: " PRORYVI : Pengajuan Baru",
      html: template,
    };

    const info = await transporter.sendMail(mailOptions);
    // console.log("Email sent to admin: " + info.response);
  } catch (error) {
    console.log(error);
  }
}

// Fungsi untuk mengirim email ke pengguna
async function sendEmailToUser(userEmail, item, user, pengajuan) {
  try {
    const namaUser = user.name;
    const namaitem = item.name;
    const deskripsi = item.description;
    const qty = item.quantity;
    const price = item.total;
    const waktu = pengajuan.createdAt;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "info.procurement04@gmail.com",
        pass: "pwsdsrlmxhlltgpa",
      },
    });

    const templatePath = path.resolve(
      __dirname,
      "../template",
      "templateMember.ejs"
    );

    // Mengambil isi template HTML
    const templateMembers = await ejs.renderFile(templatePath, {
      namaUser,
      namaitem,
      deskripsi,
      qty,
      price,
      waktu,
    });

    const mailOptions = {
      from: "info.procurement04@gmail.com",
      to: userEmail,
      subject: "PRORYVI : Pengajuan Berhasil",
      html: templateMembers,
    };

    const info = await transporter.sendMail(mailOptions);
    // console.log("Email sent to user: " + info.response);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  sendEmailToAdmin,
  sendEmailToUser,
};
