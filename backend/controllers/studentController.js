import prisma from '../prisma/client.js'


// Returns the full profile of the logged in student
export const getStudentProfile = async (req, res) => {
  try {
    const student = await prisma.student.findUnique({
      where: { userId: req.userId },// from authenticate.js
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            phoneNumber: true,
            role: true
          }
        }
      }
    })

    if (!student) {
      return res.status(404).json({ message: "Student profile not found" })
    }

    res.json(student)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Updates the logged in student's profile
export const updateStudentProfile = async (req, res) => {
  try {
    const {
      major,
      university,
      experience,
      gpa,
      graduationYear,
      linkedinUrl,
      githubUrl,
      certifications,
      cvUrl
    } = req.body

    const student = await prisma.student.update({
      where: { userId: req.userId },
      data: {
        major,
        university,
        experience,
        gpa,
        graduationYear,
        linkedinUrl,
        githubUrl,
        certifications,
        cvUrl
      }
    })

    res.json(student)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getStudentCV = async (req, res) => {
  try {
    const student = await prisma.student.findUnique({
      where: { userId: req.userId },
      select: {
        cvUrl: true
      }
    })

    if (!student) {
      return res.status(404).json({ message: "Student not found" })
    }

    res.json(student)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
